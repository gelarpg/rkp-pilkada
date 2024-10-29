import Link from "next/link";
interface BreadcrumbProps {
  href: string;
  mainPage: string;
  pageName: string;
}
const Breadcrumb = ({ href, mainPage, pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-gray-800 lg:mr-4">
      <h2 className="text-2xl font-semibold capitalize">{pageName}</h2>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href={`/${href}`}>
              {mainPage} /
            </Link>
          </li>
          <li className="font-medium text-primary-500 capitalize">
            {pageName}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
