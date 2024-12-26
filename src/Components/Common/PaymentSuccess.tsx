import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";


export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex gap-3 justify-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
          <h1 className="text-2xl font-bold text-center">Payment Successful!</h1>
        </CardHeader>
        <CardBody>
          <p className="text-center text-gray-600">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
          <p className="text-center text-gray-600 mt-2">
            {/* An email confirmation has been sent to your registered email address. */}
          </p>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link to={'/contracts'}>
            <Button color="primary">
              GO BACK
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

