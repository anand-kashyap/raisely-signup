import React from 'react';
import { Button, Spinner } from 'react-bootstrap'

interface Opts {
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: any;
  label?: string;
  className?: string;
  loading?: boolean;
}

const AButton = ({ type = 'submit', variant = 'info', label = 'Sign Up', className = 'w-100 button', loading = false }: Opts) => {
  return (
    <Button disabled={loading} variant={variant} className={className} type={type}>
      {loading ? <><Spinner as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true" /><span className="sr-only">Loading...</span></> : label}</Button>
  )
}

export default AButton
