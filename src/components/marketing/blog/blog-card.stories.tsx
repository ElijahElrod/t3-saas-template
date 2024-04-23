// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { Meta, StoryObj } from '@storybook/react';

import BlogCard from './blog-card';

const meta: Meta<typeof BlogCard> = {
  component: BlogCard,
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

export const OnDark: Story = {
  // 👇 Story-level parameters

  args: {
    imgUrl: 'https://byedispute.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstripe_subscription_webhook_events.3c27ba9d.png&w=640&q=75',
    title: 'Stripe Subscriptions Explained With a Real-World Example',
    description: "Let's setup and manage a subscription model for a fictional habit tracker app called Trackify"
  }
};