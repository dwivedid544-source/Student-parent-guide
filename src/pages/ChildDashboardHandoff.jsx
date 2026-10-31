import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ChildDashboardHandoff
 * Replaced legacy Sparky/Luna cosmic handoff with direct routing to HighOrbit Student Dashboard
 */
export const ChildDashboardHandoff = () => {
  return <Navigate to="/child/dashboard" replace />;
};

export default ChildDashboardHandoff;
