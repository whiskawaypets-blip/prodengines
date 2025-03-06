'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TestResult {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
}

export default function SupabaseTest() {
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const testSupabaseConnection = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      // Log the Supabase URL and anon key (without showing the full key for security)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('Supabase URL:', supabaseUrl);
      console.log('Anon Key (first 5 chars):', anonKey?.substring(0, 5));

      // Test 1: Simple health check
      try {
        const { error: healthError } = await supabase.from('_hello_world_test').select('*').limit(1);
        
        if (healthError) {
          setTestResult({
            success: false,
            message: 'Failed to connect to Supabase',
            details: { error: healthError }
          });
          return;
        }
      } catch (e) {
        console.error('Health check error:', e);
        setTestResult({
          success: false,
          message: 'Failed to connect to Supabase',
          details: { error: String(e) }
        });
        return;
      }

      // Test 2: Auth API check
      try {
        const { data: authData, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          setTestResult({
            success: false,
            message: 'Connected to Supabase but Auth API failed',
            details: { error: authError }
          });
          return;
        }

        // All tests passed
        setTestResult({
          success: true,
          message: 'Successfully connected to Supabase!',
          details: {
            url: supabaseUrl,
            authSessionExists: !!authData.session
          }
        });
      } catch (e) {
        console.error('Auth error:', e);
        setTestResult({
          success: false,
          message: 'Connected to Supabase but Auth API failed',
          details: { error: String(e) }
        });
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestResult({
        success: false,
        message: 'Unexpected error testing Supabase connection',
        details: { error: String(error) }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supabase Connection Test</h2>
      
      <button
        onClick={testSupabaseConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      
      {testResult && (
        <div className={`mt-4 p-4 rounded ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h3 className={`font-medium ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
            {testResult.success ? '✅ Success' : '❌ Error'}
          </h3>
          <p className="mt-1">{testResult.message}</p>
          
          {testResult.details && (
            <div className="mt-2">
              <h4 className="font-medium text-sm">Details:</h4>
              <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(testResult.details, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 