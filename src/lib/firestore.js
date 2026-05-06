import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, getDocs, getDoc, query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase.js'

// ── Generic helpers ──────────────────────────────────────────────────────────
const col = (name) => collection(db, name)
const docRef = (name, id) => doc(db, name, id)

export async function getAll(colName, orderField = 'createdAt') {
  const q = query(col(colName), orderBy(orderField, 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addItem(colName, data) {
  return addDoc(col(colName), { ...data, createdAt: serverTimestamp() })
}

export async function updateItem(colName, id, data) {
  return updateDoc(docRef(colName, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteItem(colName, id) {
  return deleteDoc(docRef(colName, id))
}

export async function getItem(colName, id) {
  const snap = await getDoc(docRef(colName, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ── Image upload to Firebase Storage ────────────────────────────────────────
export async function uploadImage(file, folder = 'gallery') {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return { url, path: storageRef.fullPath }
}

export async function deleteImage(path) {
  const storageRef = ref(storage, path)
  return deleteObject(storageRef)
}

// ── Collection names ─────────────────────────────────────────────────────────
export const ROOMS = 'rooms'
export const MENU = 'menu'
export const GALLERY = 'gallery'
export const BOOKINGS = 'bookings'
