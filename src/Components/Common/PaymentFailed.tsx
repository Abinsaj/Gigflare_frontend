import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { XCircle } from 'lucide-react';
import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex gap-3 justify-center">
          <XCircle className="w-12 h-12 text-red-500" />
          <h1 className="text-2xl font-bold text-center">Payment Failed</h1>
        </CardHeader>
        <CardBody>
          <p className="text-center text-gray-600">
            We're sorry, but your payment could not be processed at this time.
          </p>
          <p className="text-center text-gray-600 mt-2">
            Please check your payment details and try again, or contact our support team for assistance.
          </p>
        </CardBody>
        <CardFooter className="flex justify-center gap-2">
          <Link to={'/'}>
            <Button color="primary">
              Home
            </Button>
          </Link>
          {/* <Link to={}> */}
            <Button color="secondary">
              Contact Support
            </Button>
          {/* </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}

