import ErrorHandler from '@/components/custom/ui/ErrorHandler';
import GoBack from '@/components/custom/ui/GoBack';
import { getObjectBySlug } from '@/lib/queries/strapi-server';
import React from 'react'

export default async function Object({
  params: { slug },
}: {
  params: { slug: string };
}) {

  try {
    await getObjectBySlug(slug);
  } catch (error) {
    return (
      <ErrorHandler 
        error={error} 
        place="Object" 
        notFound 
        goBack 
      />
    )
  }
      
  const dataResult = await getObjectBySlug(slug);

  return (
    <div className="mx-auto w-[95%] max-w-[2200px] md:w-[85%]">
      <GoBack />
      {dataResult.title}
    </div>
  )
}
