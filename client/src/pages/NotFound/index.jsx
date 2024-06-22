import { Link, useLocation } from "react-router-dom";

export default function Notfound() {
  const location = useLocation();
  const sellerDashboard = location.pathname.includes("seller-dashboard");

  return (
    <section className="h-screen flex items-center justify-center text-center">
      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <Link
          to={sellerDashboard ? "/seller-dashboard/manage-discount" : "/"}
          className="w-1/2 mx-auto rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-secondary"
        >
          Go back to {sellerDashboard ? "manage discount" : "home"}
        </Link>
      </div>
    </section>
  );
}
