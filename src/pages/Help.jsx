// src/pages/Help.jsx

import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { ArrowLeft, FileText, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@components/common/LoadingSpinner';
import {
  useMarkdownContent,
  PageHeader,
  PageFooter,
} from '@components/common/MarkdownRenderer';
import helpContent from '@data/help.md?raw';

export default function Help() {
  const { lastUpdated, isLoading, components, proseClasses } =
    useMarkdownContent(helpContent);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-100">
          <LoadingSpinner size="lg" text="Loading Help of Service..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions and get support for using our platform."
        icon={Scale}
        lastUpdated={lastUpdated}
      />

      {/* Content Card */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <div className={proseClasses}>
            <ReactMarkdown components={components}>{helpContent}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <PageFooter
        text="Need clarification on our Help?"
        buttonText="Contact Us"
        buttonLink="/contact"
        icon={FileText}
      />
    </div>
  );
}
