import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={`flex items-center space-x-4 lg:space-x-6 ${className}`}
      {...props}
    >
      <Link
        href="/dashboard"
        prefetch={true}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/create-event"
        prefetch={true}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Events
      </Link>
      <Link
        href="/admin/users"
        prefetch={true}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Users
      </Link>
      <Link
        href="/admin/settings"
        prefetch={true}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
