import Navbar from "../../components/customers/Navbar";

export default function SkeletonProductDetails() {
  return (
    <section>
      <div className="mx-auto mt-8">
        <div className="flex flex-col md:flex-row gap-x-0 md:gap-x-20">
          <div className="w-[400px] h-[400px] bg-white object-cover border-2 border-slate-200 rounded-lg shadow-lg">
            Loading Image...
          </div>

          <div className="w-[35%] xs:w-full md:w-1/2 p-4 flex-col">
            <div className="one xs:mt-6">
              <h3 className="text-4xl mb-2">Loading Product Name...</h3>
              <h4 className=" mb-2 text-xl text-gray-500">
                {" "}
                &#36; Loading Price...
              </h4>
              <div className="mb-2 text-md">
                <span className="mr-1 ">Loading Stars...</span> |{" "}
                <span className="text-slate-400 ml-1">5 Customers Review</span>
              </div>
              <p className="p-1 justify-normal">Loading Descrition...</p>

              <div className="flex items-center justify-center text-white lg:mt-32 xs:mt-8">
                <div className="flex items-center gap-2 bg-[#ec4f22] rounded-md py-3 px-5 w-84">
                  <span>Loading Shop Loacation...</span>
                </div>
              </div>
            </div>
            <div className="two p-2 mt-52 xs:mt-16 text-lg text-slate-500">
              <hr className="border-b mb-14 border-slate-300" />
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <div className="w-1/4 text-left">SKU</div>
                  <div className="w-1/4 text-center">:</div>
                  <div className="w-1/2 text-left">SS001</div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/4 text-left">Category</div>
                  <div className="w-1/4 text-center">:</div>
                  <div className="w-1/2 text-left">Furniture</div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/4 text-left">Tags</div>
                  <div className="w-1/4 text-center">:</div>
                  <div className="w-1/2 text-left">
                    Sofa, Chair, Cushion, Shop
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/4 text-left">Share</div>
                  <div className="w-1/4 text-center">:</div>
                  <div className="w-1/2 text-left">Icons Loading...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
