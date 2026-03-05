export type NavItem = {
  href: '/';
  label: string;
} | {
  href: '/tickets' | '/messages' | '/user-service' | '/about-contact';
  label: string;
};

export type ActionItem = {
  label: string;
  onPress?: () => void;
};
