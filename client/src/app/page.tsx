import Form from "@/components/Login-Page/Form";
import Image from "next/image";
import logo from "@/assets/Untitled_logo_1_free-file (1).jpg";

export default function Home() {
  return (
    <div className="bg-image min-h-screen w-full flex justify-center items-center">
      <div className="card w-[90%] md:w-2/3 lg:w-2/5 bg-base-100 rounded-lg">
        <div className="card-body">
          <Form />
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              width={16}
              height={16}
              alt="logo"
              className="rounded-full"
            />
            <p>Powered by Kodlash Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
