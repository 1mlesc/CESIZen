import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID || 'local',
  });
}
