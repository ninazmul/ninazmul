import { Spinner } from "flowbite-react";
export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center ">
        <Spinner size="xl" color="success" />
      </div>
    </div>
  );
}
