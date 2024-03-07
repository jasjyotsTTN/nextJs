import { PrismaClient } from "@prisma/client";
import axios from "axios";

const client = new PrismaClient();

async function getUserDetails() {
  // try {
  //   const user = await client.user.findFirst({});
  //   return {
  //     email: user?.email,
  //     password: user?.password,
  //   };
  // } catch (e) {
  //   console.log(e);
  // }
  const signUp = await axios.get("/api/user");
  return signUp?.data;
}

export default async function Home() {
  const terraformDataResponse = await getUserDetails();
  const regex =
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>{terraformDataResponse}</div>
        </div>
      </div>
    </div>
  );
}
