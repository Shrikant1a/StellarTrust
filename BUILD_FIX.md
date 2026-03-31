This file was created to trigger a rebuild on Vercel after removing the redundant projects/id folder which was causing build errors.
The fix was to remove `app/projects/id/page.tsx` as it was a duplicate of `app/projects/[id]/page.tsx`.
