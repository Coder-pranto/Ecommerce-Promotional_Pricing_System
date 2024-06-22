// import ScrollToTop from "react-scroll-to-top";
import ScrollToTop from "react-scroll-up";
import AppDownload from "../../components/customers/AppDownload";
import { FaArrowUp } from 'react-icons/fa';


const TermsAndConditions = () => {

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold py-2">Discount Hut Terms & Conditions</h1>
        <div className="introduction">
          <p className="text-xl py-4">Welcome to Discount Hut! These terms and conditions govern your use of our website. By accessing or using our website, you agree to abide by these terms. If you do not agree with any part of these terms, please do not use our website.</p>
        </div>
        <div className="section">
          <h2 className="uppercase text-lg font-semibold ">1. Acceptance of Terms</h2>
          <p className="py-3">By accessing or using Discount Hut, you agree to be bound by these terms and conditions. If you do not agree to these terms, please refrain from using our website.</p>
        </div>
        <div className="section">
          <h2 className="uppercase text-lg font-semibold">2. Use of the Website</h2>
          <p className="py-3">You may use Discount Hut for your personal use and in accordance with these terms. You agree not to use our website for any unlawful or prohibited purposes.</p>
        </div>
        <div>
          <div className="section">
            <h2 className="uppercase text-lg font-semibold">3. Intellectual Property Rights</h2>
            <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum sapiente illo. Illo cum omnis quod eius, fuga possimus placeat assumenda quaerat et? Corrupti a aut dolorum qui expedita itaque quae quam animi, eveniet nesciunt iusto distinctio corporis similique odio rerum libero ea deserunt tempora nulla mollitia quia praesentium illo id optio. Incidunt sint</p>
          </div>
          <div className="section">
            <h2 className="uppercase text-lg font-semibold">4. Privacy Policy</h2>
            <p className="py-3">Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information.</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">5. Third-Party Links</h2>
            <p className="py-3">Discount Hut may contain links to third-party websites. We are not responsible for the content or accuracy of these websites, and your use of third-party websites is at your own risk.</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">6. Disclaimer of Warranties</h2>
            <p className="py-3">{`Discount Hut is provided on an "as is" and "as available" basis without any warranties, express or implied. We do not warrant that our website will be error-free or uninterrupted.`}</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">7. Limitation of Liability</h2>
            <p className="py-3">In no event shall Discount Hut be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use our website.</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">8. Limitation of Liability</h2>
            <p className="py-3">We reserve the right to update or modify these terms and conditions at any time. Any changes will be effective immediately upon posting on our website.</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">9. Governing Law</h2>
            <p className="py-3">These terms and conditions shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflicts of law provisions.</p>
          </div>

          <div className="section">
            <h2 className="uppercase text-lg font-semibold">10. Governing Law</h2>
            <p className="py-3">
              If you have any questions or concerns about these terms and conditions, please contact us at{" "}
              <a href="mailto:support@discounthut.com" className="text-blue-500 ">support@discounthut.com</a>.
            </p>
          </div>


        </div>

        <ScrollToTop showUnder={160}>
          <div className="fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-3 shadow-md cursor-pointer outline outline-2 outline-offset-2">
            <FaArrowUp size={24} />
          </div>
        </ScrollToTop>

        <AppDownload />

      </div>
    </>
  )
}

export default TermsAndConditions;