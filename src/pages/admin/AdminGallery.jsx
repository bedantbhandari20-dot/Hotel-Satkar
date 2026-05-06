import { useEffect, useState, useRef } from 'react'
import { Upload, Trash2, X, ImagePlus } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { getAll, addItem, deleteItem, uploadImage, deleteImage, GALLERY } from '../../lib/firestore.js'

export default function AdminGallery() {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const fileRef = useRef()

  const load = () => getAll(GALLERY).then(setImages)
  useEffect(() => { load() }, [])

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setOpen(true)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    try {
      const { url, path } = await uploadImage(file, 'gallery')
      await addItem(GALLERY, { url, path, caption })
      await load()
      setOpen(false); setFile(null); setPreview(null); setCaption('')
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (img) => {
    if (!confirm('Delete this image?')) return
    try {
      if (img.path) await deleteImage(img.path)
    } catch (_) {}
    await deleteItem(GALLERY, img.id)
    load()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-[#2C2418] uppercase tracking-wide">Gallery</h2>
        <button onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-wider hover:bg-[#3d3324] transition-colors">
          <Upload size={14} /> Upload Image
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {images.length === 0 && (
        <div className="bg-[#FAF7F0] rounded-lg border border-[rgba(44,36,24,0.06)] p-16 text-center">
          <ImagePlus size={32} className="mx-auto text-[#C4982C]/40 mb-3" />
          <p className="text-[#6B5E4F] text-sm">No images yet. Upload your first photo.</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {images.map(img => (
          <div key={img.id} className="relative group rounded-lg overflow-hidden aspect-square bg-[#EDE7DA]">
            <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              {img.caption && <p className="text-white text-[11px] text-center leading-tight">{img.caption}</p>}
              <button onClick={() => handleDelete(img)}
                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-[#FAF7F0] rounded-lg p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl uppercase tracking-wide text-[#2C2418]">Upload Image</h3>
              <button onClick={() => setOpen(false)}><X size={18} className="text-[#6B5E4F]" /></button>
            </div>
            {preview && <img src={preview} alt="preview" className="w-full aspect-video object-cover rounded mb-4" />}
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-1.5">Caption (optional)</label>
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EDE7DA] border border-[rgba(44,36,24,0.1)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/30" />
              </div>
              <button type="submit" disabled={uploading}
                className="w-full py-3 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-widest hover:bg-[#3d3324] transition-colors disabled:opacity-50">
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
