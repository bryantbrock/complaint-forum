import {derived, writable} from "svelte/store"
import {isEmpty} from "./util/misc.js"

// User
export const user = writable({})
export const isAuthenticated = derived(
  user,
  ($user, set) => set(!isEmpty($user)),
  false
)

// Complaints
export const complaining = writable(false)
export const complaintValues = writable({
  id: null,
  title: null,
  body: null,
  tags: [],
  status: 'Open',
})