import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '#/components/ui/button'
import { Menu } from 'lucide-react'
import MenuSheet from '#/components/containers/store/menu/menu-sheet'
import { useCartStores } from '#/lib/store/store/cart/cart.store'
interface NavItem {
  label: string
  to: string
}
interface NavBarProps {
  items: NavItem[]
  className?: string
  linkClassName?: string
  activeLinkClassName?: string
}

export default function Navbar({
  items,
  className = 'hidden items-center gap-6 text-sm @5xl:flex',
  linkClassName = '',
  activeLinkClassName = '',
}: NavBarProps) {
  const { setIsOpenMenu } = useCartStores()
  return (
    <nav className={cn(className)}>
      <Button
        variant="outline"
        size="icon-lg"
        type="button"
        onClick={() => setIsOpenMenu(true)}
        aria-label="Open Cart"
        className="relative"
      >
        <Menu className="@7xl:size-6 size-5" />
      </Button>

      <MenuSheet />


      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            'flex @7xl:h-16 items-center justify-center rounded-xl border border-dashed bg-transparent px-7.5 py-2 text-lg transition-all hover:border-transparent hover:bg-primary hover:text-background dark:text-body-70 dark:hover:text-background',
            linkClassName,
          )}
          activeProps={{
            className: cn(
              '@7xl:h-16 h-12 rounded-xl text-lg px-7.5 py-2 bg-foreground! text-background border-transparent dark:bg-body-10! hover:dark:text-foreground',
              activeLinkClassName,
            ),
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
