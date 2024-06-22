/* eslint-disable no-constant-condition */
import { faCheck, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProfile from "../AddProfile";
import { useState } from "react";
import AddAddress from "../AddAddress";
import AddIdentity from "../AddIdentity";

export default function NewSellerRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completeStep, setCompleteStep] = useState(0);
  const [sellerId, setSellerId] = useState("");

  return (
    <div className="w-[80%] mx-auto mt-12">
      {/** header content off the page */}
      <div className="border-b-2 border-b-[#ddd]">
        <div className="flex gap-2 items-center">
          <p className="text-primary">
            <FontAwesomeIcon icon={faNewspaper} />
          </p>
          <h2 className="font-semibold sm:text-lg xs:text-md">
            New Seller Registration
          </h2>
        </div>
        <p className="ml-6 mt-2 mb-4 sm:text-md xs:text-[14px]">
          Please complete the steps below for active your shop
        </p>
      </div>

      {/** multistep bar */}
      <div className="py-6 flex justify-center">
        <div
          className={`flex gap-2 items-center ${
            currentStep === 1
              ? "bg-primary"
              : completeStep === 1 || 2
              ? "bg-green-600"
              : "border-2 border-primary"
          } w-[30%] rounded-full`}
        >
          <span className="w-[30px] h-[30px] bg-white block border-2 border-primary rounded-full text-center p-[2px]">
            {(currentStep === 2 && completeStep === 1) || 2 ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              1
            )}
          </span>
          <span
            className={`${
              currentStep || completeStep === 1 ? "text-white" : ""
            } sm:text-lg xs:text-[12px]`}
          >
            Add Profile
          </span>
        </div>
        <div
          className={`flex gap-2 items-center ${
            currentStep === 2
              ? "bg-primary"
              : completeStep === 2
              ? "bg-green-600"
              : "border-2 border-primary"
          } w-[30%] rounded-full`}
        >
          <span className="w-[30px] h-[30px] bg-white block border-2 border-primary rounded-full text-center p-[2px]">
            {currentStep === 3 && completeStep === 2 ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              2
            )}
          </span>
          <span
            className={`${
              currentStep === 2 || completeStep === 2 ? "text-white" : ""
            }  sm:text-lg xs:text-[12px]`}
          >
            Add Address
          </span>
        </div>
        <div
          className={`flex gap-2 items-center ${
            currentStep === 3
              ? "bg-primary"
              : completeStep === 3
              ? "bg-green-600"
              : "border-2 border-primary"
          } w-[30%] rounded-full`}
        >
          <span className="w-[30px] h-[30px] bg-white block border-2 border-primary rounded-full text-center p-[2px]">
            3
          </span>
          <span
            className={`${
              currentStep === 3 ? "text-white" : ""
            }  sm:text-lg xs:text-[12px]`}
          >
            Add Identity
          </span>
        </div>
      </div>

      {currentStep === 1 ? (
        <AddProfile
          setCurrentStep={setCurrentStep}
          setCompleteStep={setCompleteStep}
          setSellerId={setSellerId}
        />
      ) : currentStep === 2 ? (
        <AddAddress
          setCurrentStep={setCurrentStep}
          setCompleteStep={setCompleteStep}
          sellerId={sellerId}
        />
      ) : currentStep === 3 ? (
        <AddIdentity
          setCurrentStep={setCurrentStep}
          setCompleteStep={setCompleteStep}
          sellerId={sellerId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
