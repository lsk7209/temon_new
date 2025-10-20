"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, X, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { trackClick } from '@/lib/analytics'

interface UploadComponentProps {
  uploadType: 'test_image' | 'result_image' | 'avatar' | 'banner'
  onUploadComplete?: (data: any) => void
  onUploadError?: (error: string) => void
  maxSize?: number
  acceptedTypes?: string[]
  className?: string
}

interface UploadedFile {
  id: string
  file_name: string
  file_url: string
  file_size: number
  mime_type: string
  upload_type: string
  created_at: string
}

export default function UploadComponent({
  uploadType,
  onUploadComplete,
  onUploadError,
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = ''
}: UploadComponentProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      const errorMsg = `Invalid file type. Allowed types: ${acceptedTypes.join(', ')}`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      const errorMsg = `File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB`
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', uploadType)

      // Track upload start
      trackClick(`upload_start_${uploadType}`, window.location.pathname)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      // Simulate progress for better UX
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      setUploadedFiles(prev => [result.data, ...prev])
      onUploadComplete?.(result.data)

      // Track successful upload
      trackClick(`upload_success_${uploadType}`, window.location.pathname)

    } catch (error) {
      console.error('Upload error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Upload failed'
      setError(errorMsg)
      onUploadError?.(errorMsg)

      // Track upload error
      trackClick(`upload_error_${uploadType}`, window.location.pathname)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const deleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/upload?id=${fileId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
      trackClick(`upload_delete_${uploadType}`, window.location.pathname)

    } catch (error) {
      console.error('Delete error:', error)
      setError('Failed to delete file')
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getUploadTypeIcon = () => {
    switch (uploadType) {
      case 'test_image':
      case 'result_image':
        return <Image className="w-6 h-6" />
      case 'avatar':
        return <Image className="w-6 h-6" />
      case 'banner':
        return <Image className="w-6 h-6" />
      default:
        return <FileText className="w-6 h-6" />
    }
  }

  const getUploadTypeLabel = () => {
    switch (uploadType) {
      case 'test_image':
        return '테스트 이미지'
      case 'result_image':
        return '결과 이미지'
      case 'avatar':
        return '프로필 이미지'
      case 'banner':
        return '배너 이미지'
      default:
        return '파일'
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {getUploadTypeIcon()}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {getUploadTypeLabel()} 업로드
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                파일을 드래그하거나 클릭하여 업로드하세요
              </p>
              <p className="text-xs text-gray-500">
                최대 {Math.round(maxSize / 1024 / 1024)}MB • {acceptedTypes.join(', ')}
              </p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>업로드 중...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">업로드된 파일</h4>
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getUploadTypeIcon()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.file_name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.file_size)} • {new Date(file.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
