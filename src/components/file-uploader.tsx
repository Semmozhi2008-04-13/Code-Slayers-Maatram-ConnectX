"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileImage, Video, X, Loader2, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

type UploadableFile = {
  file: File;
  preview: string;
  type: 'image' | 'video';
  errors: string[];
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
};

const FileUploader = () => {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const getFileError = (file: File): string[] => {
    const errors: string[] = [];
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      errors.push('Invalid file type. Only images and videos are accepted.');
      return errors;
    }

    if (isImage && file.size > MAX_IMAGE_SIZE_BYTES) {
      errors.push(`Image too large. Max size is ${MAX_IMAGE_SIZE_MB}MB.`);
    }

    if (isVideo && file.size > MAX_VIDEO_SIZE_BYTES) {
      errors.push(`Video too large. Max size is ${MAX_VIDEO_SIZE_MB}MB.`);
    }

    return errors;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
        const errors = getFileError(file);
        return {
            file,
            preview: URL.createObjectURL(file),
            type: file.type.startsWith('image/') ? 'image' : 'video',
            errors,
            id: `${file.name}-${file.lastModified}-${file.size}`,
            progress: 0,
            status: errors.length > 0 ? 'error' : 'pending'
        } as UploadableFile;
    });

    setFiles(prevFiles => {
        const updatedFiles = [...prevFiles];
        newFiles.forEach(newFile => {
            if (!updatedFiles.some(f => f.id === newFile.id)) {
                updatedFiles.push(newFile);
            }
        });
        return updatedFiles;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm', '.mov']
    }
  });

  const removeFile = (id: string) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter(f => f.id !== id);
    });
  };

  const hasErrors = useMemo(() => files.some(f => f.errors.length > 0), [files]);
  const isSubmittable = files.length > 0 && !hasErrors && !isUploading;

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate file by file upload
    for (let i = 0; i < files.length; i++) {
        const fileId = files[i].id;
        
        // Set status to uploading
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'uploading' } : f));
        
        // Simulate progress
        const progressInterval = setInterval(() => {
            setFiles(prev => prev.map(f => {
                if (f.id === fileId && f.progress < 100) {
                    return { ...f, progress: Math.min(f.progress + 10, 100) };
                }
                return f;
            }));
        }, 100);

        // Simulate upload completion
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        clearInterval(progressInterval);

        // Mark as success
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: 100, status: 'success' } : f));
    }
    
    toast({
        title: "Upload Complete",
        description: `${files.length} file(s) have been successfully uploaded.`,
    });
    
    // Reset after a delay
    setTimeout(() => {
        setFiles([]);
        setIsUploading(false);
    }, 2000);
  };
  
  const totalProgress = useMemo(() => {
    if (files.length === 0) return 0;
    const total = files.reduce((acc, file) => acc + file.progress, 0);
    return total / files.length;
  }, [files]);


  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <Card className="p-4 sm:p-6">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200",
              "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400",
              isDragActive && "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400">
              <UploadCloud className="w-12 h-12 text-gray-400" />
              <p className="font-semibold text-lg">
                {isDragActive ? 'Drop files here...' : 'Drag & drop files or click to browse'}
              </p>
              <p className="text-sm">Supports images (PNG, JPG, up to 5MB) and videos (MP4, MOV, up to 50MB)</p>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6 space-y-4">
                <AnimatePresence>
                    {files.map(uploadableFile => (
                        <motion.div 
                            key={uploadableFile.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FileItem
                                file={uploadableFile}
                                onRemove={removeFile}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-8">
               {isUploading && <Progress value={totalProgress} className="w-full h-2 mb-4" />}
                <Button 
                    onClick={handleUpload} 
                    disabled={!isSubmittable} 
                    className="w-full"
                >
                    {isUploading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                    ) : `Upload ${files.length} File(s)`}
                </Button>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
};

const FileItem = ({ file, onRemove }: { file: UploadableFile, onRemove: (id: string) => void }) => {
    
    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    
    return (
        <div className="flex items-start gap-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                {file.type === 'image' ? (
                    <img src={file.preview} alt={file.file.name} className="w-full h-full object-cover" />
                ) : (
                    <>
                        <video src={file.preview} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                        </div>
                    </>
                )}
            </div>
            <div className="flex-grow overflow-hidden">
                <p className="font-semibold text-sm truncate text-gray-800 dark:text-gray-200">{file.file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatBytes(file.file.size)} &middot; {file.type}
                </p>
                {file.errors.length > 0 ? (
                     <div className="mt-1 flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 flex-shrink-0"/>
                        <span>{file.errors.join(', ')}</span>
                    </div>
                ) : (
                    file.status !== 'pending' && (
                        <div className="mt-2">
                             <Progress value={file.progress} className="h-1.5" />
                        </div>
                    )
                )}
            </div>
            <div className="flex-shrink-0">
                 {file.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500"/>
                 ) : file.status === 'uploading' ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500"/>
                 ) : (
                    <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => onRemove(file.id)}>
                        <X className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" />
                    </Button>
                 )}
            </div>
        </div>
    )
}

export default FileUploader;