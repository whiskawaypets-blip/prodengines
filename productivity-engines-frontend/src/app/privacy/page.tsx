'use client';

import { Container } from "@/components/ui/container";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-medium tracking-tight sm:text-5xl text-gray-900 dark:text-white mb-5">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last Updated: March 1, 2025
              </p>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Productivity Engines ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect via the website or through our services includes:
              </p>
              
              <h3>2.1 Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, email address, telephone number, and company information that you voluntarily provide to us when you register with the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
              </p>
              
              <h3>2.2 Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
              </p>
              
              <h3>2.3 Financial Data</h3>
              <p>
                Financial information, such as data related to your payment method (e.g., credit card number, bank account details) that we may collect when you purchase our services. We store only very limited financial information that we need to process payments. All financial information is processed through our payment processor and is subject to their privacy policies.
              </p>
              
              <h2>3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website or our services to:
              </p>
              <ul>
                <li>Create and manage your account</li>
                <li>Process payments and refunds</li>
                <li>Provide and manage access to our services</li>
                <li>Respond to customer service requests and support needs</li>
                <li>Send you technical notices, updates, security alerts, and administrative messages</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity</li>
                <li>Request feedback and contact you about your use of our services</li>
                <li>Resolve disputes and troubleshoot problems</li>
                <li>Compile anonymous statistical data and analysis for use internally or with third parties</li>
                <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the website to you</li>
                <li>Improve the efficiency and operation of the website and our services</li>
              </ul>
              
              <h2>4. Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              
              <h3>4.1 By Law or to Protect Rights</h3>
              <p>
                We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
              </p>
              
              <h3>4.2 Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>
              
              <h3>4.3 Business Transfers</h3>
              <p>
                We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </p>
              
              <h3>4.4 Third-Party Advertisers</h3>
              <p>
                We may use third-party advertising companies to serve ads when you visit the website. These companies may use information about your visits to the website and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.
              </p>
              
              <h2>5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
              
              <h2>6. Your Privacy Rights</h2>
              <p>
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Productivity Engines aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              <p>
                If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
              </p>
              <p>
                In certain circumstances, you have the following data protection rights:
              </p>
              <ul>
                <li>The right to access, update or delete the information we have on you</li>
                <li>The right of rectification</li>
                <li>The right to object</li>
                <li>The right of restriction</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              
              <h2>7. Children's Privacy</h2>
              <p>
                The website and our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under the age of 13. If we learn we have collected personal information from a child under the age of 13, we will delete this information as quickly as possible.
              </p>
              
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
              </p>
              
              <h2>9. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p>
                <strong>Productivity Engines</strong><br />
                Email: privacy@productivityengines.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}