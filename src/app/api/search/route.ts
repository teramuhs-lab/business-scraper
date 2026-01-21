import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { location, search_query, max_number_of_results } = body;

    if (!location || !search_query) {
      return NextResponse.json(
        { success: false, error: 'Location and search query are required' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: 'Webhook URL not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: {
          location,
          search_query,
          max_number_of_results: max_number_of_results || 10,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n webhook error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch business data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
