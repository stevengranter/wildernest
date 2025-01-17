import {
  IconCards,
  IconCrane,
  IconHome,
  IconUsersGroup,
} from "@tabler/icons-react"

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },

  { icon: IconCards, label: "Collections", to: "/collections" },
]

export const adminLinks = [
  { icon: IconUsersGroup, label: "Users", to: "/users" },
  { icon: IconCrane, label: "Dev", to: "/dev" },
]
