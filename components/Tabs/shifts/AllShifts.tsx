'use client'
import Loading from "@/app/(dashboard)/loading";
import { Suspense } from "react";
import AllShiftsComp from "./AllShiftsComp";

function AllShifts({ userID }: { userID: string }) {
   return (

      <Suspense key={userID} fallback={<Loading />}>
        <AllShiftsComp userID={userID} />
      </Suspense>

  );
}

export default AllShifts;