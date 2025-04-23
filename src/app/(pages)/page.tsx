import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen h-screen grid place-items-center bg-gray-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome to Sylva!</CardTitle>
          <CardDescription>What do you want to do?</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2 justify-end">
          <Link href="/demo">
            <Button variant="secondary">Try out demo</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Go to my board</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
