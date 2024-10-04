// @ts-nocheck
import React, { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{ color: 'red', fontSize: 'xx-large' }}>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
