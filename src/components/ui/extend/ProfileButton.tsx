import { Link } from 'react-router';

export default function ProfileButton() {
  return (
    <Link
      to="/الملف-الشخصي"
      className="bg-secondary text-secondary-foreground h-7 rounded-md border border-[#ECECEC] px-2 pt-1 text-center shadow-xs"
    >
      الملف الشخصي
    </Link>
  );
}
