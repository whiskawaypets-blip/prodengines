import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Initialize Supabase client with admin privileges
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: NextRequest) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Service role key not configured' },
      { status: 500 }
    );
  }

  // Get email from query params
  const email = request.nextUrl.searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Find the user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from('auth.users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError) {
      if (userError.code === 'PGRST116') {
        return NextResponse.json(
          { error: `No user found with email ${email}` },
          { status: 404 }
        );
      }
      throw userError;
    }

    if (!user) {
      return NextResponse.json(
        { error: `No user found with email ${email}` },
        { status: 404 }
      );
    }

    // Check if user already has admin role
    const { data: existingRole, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError && roleError.code !== 'PGRST116') {
      throw roleError;
    }

    if (existingRole) {
      return NextResponse.json({
        success: true,
        message: `User ${email} is already an admin`
      });
    }

    // Set admin role
    const { error: insertError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: user.id,
        role: 'admin'
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: `User ${email} has been granted admin privileges`
    });
  } catch (error) {
    console.error('Error setting admin role:', error);
    return NextResponse.json(
      { error: 'Failed to set admin role', details: error },
      { status: 500 }
    );
  }
}