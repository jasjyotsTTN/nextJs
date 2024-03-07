import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

const { exec, spawn } = require("child_process");

function execute(command: string) {
  return new Promise((res, rej) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error executing the command: ${error}`);
        return rej(stderr);
      }

      return res(stdout);
    });
  });
}

function spawnCommand(command: string) {}

const command = "cd app && cd api && cd user && zsh bash.zsh ";

export async function GET() {
  try {
    const data: any = await execute(command);

    const regex =
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

    return new Response(data?.replace(regex, ""), {
      status: 200,
    });
  } catch (err) {
    NextResponse.json({
      error: "ERROR IN PROCESSING",
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await client.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  console.log(user.id);

  return NextResponse.json({ message: "Signed up" });
}
