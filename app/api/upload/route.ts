import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const applicationId = formData.get('applicationId') as string;
    const type = formData.get('type') as string;

    if (!file || !applicationId || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create application directory if it doesn't exist
    const applicationDir = path.join(process.cwd(), 'public', 'applications', applicationId);
    await createDirectoryIfNotExists(applicationDir);

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${type}_${timestamp}.${fileExtension}`;
    const filePath = path.join(applicationDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the relative URL path
    const relativePath = `/applications/${applicationId}/${fileName}`;
    
    return NextResponse.json({ url: relativePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

async function createDirectoryIfNotExists(dirPath: string) {
  try {
    await writeFile(dirPath, '', { flag: 'wx' });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
} 