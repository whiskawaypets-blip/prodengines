import { Container } from "@/components/ui/container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/ai" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Conversational AI
                  </Link>
                </li>
                <li>
                  <Link href="/services/automation" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Process Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services/integration" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    System Integration
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="mailto:info@productivityengines.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    info@productivityengines.com
                  </Link>
                </li>
                <li>
                  <Link href="tel:+18005551234" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                    (800) 555-1234
                  </Link>
                </li>
                <li>
                  <address className="text-gray-600 dark:text-gray-400 text-sm not-italic">
                    123 Innovation Way<br />
                    San Francisco, CA 94103
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Productivity Engines, Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Terms
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
} 