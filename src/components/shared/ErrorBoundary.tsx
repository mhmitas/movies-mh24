'use client';

import React from 'react';

type Props = {
    children: React.ReactNode;
    message?: string; // Custom message prop
};

type State = {
    hasError: boolean;
    error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    {/* <h2>{this.props.message || 'Something went wrong.'}</h2> */}
                    <p className='my-container'>{this.props.message || 'Something went wrong.'}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
