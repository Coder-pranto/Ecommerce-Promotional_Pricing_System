
import { FaArrowUp } from "react-icons/fa6"
import ScrollToTop from "../../layout/InitialLayoutCustomer/ScrollToTop"
import AppDownload from "../../components/customers/AppDownload"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Accordion, AccordionTab } from 'primereact/accordion';

const Faq = () => {

    return (
        <>
            <div className="flex flex-col">
                <div className="text-3xl font-bold mx-auto mt-6">
                    <h2 className="text-primary">Your Right To Know</h2>
                </div>
                <div className="w-full mx-auto mb-4 mt-8">
                <img src="faq.jpg" alt="Landscape" className="w-full h-[500px] object-fill rounded-md " />
                </div>
                <div className="card mt-12">
                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="1. What is Discount Hut?">
                            <p className="m-0">
                                Discount Hut is a centralized platform where users can discover and purchase discounted products from various retailers and vendors.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="2. How does Discount Hut work?">
                            <p className="m-0">
                                Discount Hut aggregates discounted products from different sellers and displays them on our platform. Users can browse through categories, search for specific products, and find deals based on their location.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="3. Is Discount Hut free to use?">
                            <p className="m-0">
                                Yes, Discount Hut is free for users. There are no subscription fees or hidden charges for accessing our platform and browsing discounted products.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="4. How do I purchase products on Discount Hut?">
                    <p className="m-0">
                        {`Simply click on the product you're interested in, and you'll be redirected to the seller's website to complete the purchase. Discount Hut acts as a bridge between users and sellers, facilitating the discovery of discounts.`}
                    </p>
                </AccordionTab>
                <AccordionTab header="5. Can I trust the sellers featured on Discount Hut?">
                    <p className="m-0">
                        Discount Hut partners with reputable sellers and vendors to ensure the quality and authenticity of the products listed on our platform. However, users should exercise due diligence when making purchases.
                    </p>
                </AccordionTab>
                <AccordionTab header="6. How often are discounts updated on Discount Hut?">
                    <p className="m-0">
                        Discounts are updated regularly on Discount Hut to provide users with the latest deals and offers. We strive to keep our platform updated with new discounts and promotions from our partners.
                    </p>
                </AccordionTab>
                <AccordionTab header="7. Is my personal information safe on Discount Hut?">
                    <p className="m-0">
                        Yes, we take the security and privacy of our users seriously. We employ industry-standard security measures to protect your personal information. For more details, please refer to our Privacy Policy.
                    </p>
                </AccordionTab>
                <AccordionTab header="8. How can I contact Discount Hut for support?">
                    <p className="m-0">
                        If you have any questions, concerns, or feedback, you can reach out to us through our contact form or email us at support@discounthut.com. Our support team will be happy to assist you.
                    </p>
                </AccordionTab>
                <AccordionTab header="9. Can I list my products on Discount Hut?">
                    <p className="m-0">
                      {`  If you're a seller or vendor interested in listing your products on Discount Hut, please contact us to discuss partnership opportunities. We're always looking to expand our network of sellers and offer more discounts to our users.`}
                    </p>
                </AccordionTab>
                <AccordionTab header="10. How can I stay updated on new discounts and promotions?">
                    <p className="m-0">
                        To stay informed about the latest discounts and promotions, you can sign up for our newsletter or follow us on social media. We regularly share updates and exclusive deals with our subscribers and followers.
                    </p>
                </AccordionTab>
                    </Accordion>
                </div>

                <ScrollToTop showUnder={100}>
                    <div className="fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-3 shadow-md cursor-pointer outline outline-2 outline-offset-2">
                        <FaArrowUp size={24} />
                    </div>
                </ScrollToTop>

                <AppDownload />
            </div>
        </>
    )
}

export default Faq;
