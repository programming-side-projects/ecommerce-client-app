import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
	const cookieStore = cookies();

	const token = cookieStore.get("accessToken");

	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const { value } = token;

	const secret = process.env.JWT_SECRET || "";

	try {
		verify(value, secret);

		const response = {
			user: "Secret User",
		};

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (e) {
		return NextResponse.json(
			{
				message: "Something went wrong!",
			},
			{
				status: 400,
			}
		);
	}
};
