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

export type Ticket = {
  id: number,
  assignedAgentId: number,
  createdAt: Date,
  customerId: number,
  description: string,
  priority: string,
  status: string,
  title: string,
  updatedAt: Date,
  customerName: string,
  assignedAgentName: string
}

export type User = {
  id: number,
  name: string,
  email: string,
  role: 'ADMIN' | 'AGENT' | 'CUSTOMER',
  createdAt: Date
}