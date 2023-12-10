import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30;

export const POST = async (request: Request) => {
	const data = await request.json();

	const { username, password, accessToken } = data;

	let token;

	if (!accessToken) {
		// check if the credentials valid or not
		if (username != "admin" || password != "admin") {
			return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
		}

		// get the jwt secret
		const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "";

		token = sign({ username }, secret, { expiresIn: MAX_AGE });
	} else {
		token = accessToken;
	}

	// Save to cookies
	const serialized = serialize("accessToken", token, {
		httpOnly: true,
		secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
		sameSite: true,
		maxAge: MAX_AGE,
		path: "/",
	});

	const response = {
		message: "Authorized",
	};

	return new Response(JSON.stringify(response), {
		headers: { "Set-Cookie": serialized },
		status: 200,
	});
};
