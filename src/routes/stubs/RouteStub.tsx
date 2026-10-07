import React from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Text';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface RouteStubProps {
  title: string;
  category: string;
  routePath: string;
  description: string;
  nextStep?: string;
}

export const RouteStub: React.FC<RouteStubProps> = ({
  title,
  category,
  routePath,
  description,
  nextStep = 'Scheduled in Next Implementation Steps',
}) => {
  return (
    <Section spacing="hero" surface="ground" border="bottom">
      <Container size="default">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="blue">{category}</Badge>
            <span className="font-sans text-xs text-text-muted">
              Path: <code className="text-brand-primary bg-surface-subtle px-2 py-0.5 border border-surface-border rounded-sm">{routePath}</code>
            </span>
          </div>

          <Heading level="display-xl" color="blue" uppercase className="mb-6">
            {title}
          </Heading>

          <Text variant="body-lg" tone="secondary" className="mb-8">
            {description}
          </Text>

          <div className="p-6 bg-surface-subtle border border-surface-border mb-8 rounded-sm">
            <div className="font-sans text-xs uppercase tracking-wider font-bold text-brand-primary mb-2">
              Corporate Architecture Ready &bull; Puducherry &amp; Chennai
            </div>
            <p className="text-sm text-text-secondary">
              This route is fully wired into the AG ADS routing architecture and the White &amp; Professional Blue corporate design system. {nextStep}.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button to="/" variant="secondary" size="md">
              &larr; Design System Showcase
            </Button>
            <Button to="/contact" variant="primary" size="md" icon={true}>
              Let's Grow
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
