"use client"

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { ObjectBySlug } from '@/lib/schemas/strapi-schemas';
import { motion } from 'framer-motion';
import React from 'react'

function SingleItemTable({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (!!value && value.length > 1) {
    return (
      <TableRow>
        <TableCell className="w-2/5 py-3 text-base font-semibold">
          {label}
        </TableCell>
        <TableCell className="w-3/5 py-3 font-normal">{value}</TableCell>
      </TableRow>
    );
  } else return null;
}
  
function SingleItemTableArray({
  label,
  value,
}: {
  label: string;
  value: { title: string; }[]
}) {
  if (value.length === 0) {
    return null;
  } else if (value.length === 1) {
    return (
      <TableRow>
        <TableCell className="w-2/5 py-3 text-base font-semibold">
          {label}
        </TableCell>
        <TableCell className="w-3/5 py-3 font-normal">
          {value[0].title}
        </TableCell>
      </TableRow>
    );
  } else
  return (
    <TableRow>
      <TableCell className="w-2/5 py-3 text-base font-semibold">
        {label}
      </TableCell>
      <TableCell className="flex w-3/5 flex-col gap-2 py-3 font-normal">
        {value.map((el, index) => (
          <p key={index}>{el.title}</p>
        ))}
      </TableCell>
    </TableRow>
  );
}

export default function Metadata({
  data
}: {
  data: ObjectBySlug
}) {
  const architectural_styles = data.architectural_styles.data.map(item => {
    return { title: item.attributes.title }
  })

  const architects = data.architects.data.map(item => {
    return { title: item.attributes.title }
  })

  const region = !!data.region.data ? data.region.data.attributes.title + ", " : ""
  const district = !!data.district.data ? data.district.data.attributes.title + ", " : ""
  const city = !!data.city.data ? data.city.data.attributes.title + ", " : ""
  const location = !!data.location ? data.location : ""

  const locationFull = region + district + city + location

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, type: "tween", delay: 0.3 }}
      className="w-full flex flex-col"
    >
      <h2 className="mb-3 text-xl font-bold lg:text-2xl">
        Метаданные
      </h2>
    
      <Table className="text-sm">
        <TableBody>
          <SingleItemTable
            label="Название"
            value={data.title}
          />
          <SingleItemTable
            label="Конфессия"
            value={data.confession.data?.attributes.title}
          />
          <SingleItemTableArray
            label="Архитектурный стиль"
            value={architectural_styles}
          />
          {!!data.architectsString && data.architectsString?.length > 0 
          ? (
              <SingleItemTable
                label="Архитекторы и строители"
                value={data.architectsString}
              />
            ) :  (
              <SingleItemTableArray
                label="Архитекторы и строители"
                value={architects}
              />
            )
          }
          <SingleItemTable
            label="Местоположение"
            value={locationFull.length > 0 ? locationFull : undefined}
          />
          <SingleItemTable
            label="Широта"
            value={data.geolocation.latitude.toString()}
          />
          <SingleItemTable
            label="Долгота"
            value={data.geolocation.longitude.toString()}
          />
          <SingleItemTable
            label="Дата постройки"
            value={data.dateConstruction ? data.dateConstruction : undefined}
          />
          <SingleItemTableArray
            label="Изменения"
            value={data.appearanceChangesList}
          />
        </TableBody>
      </Table>
    </motion.div>
  )
}
