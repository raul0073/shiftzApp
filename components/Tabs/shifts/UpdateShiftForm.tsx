'use client'
import { ShiftType } from '@/models/shift';
import { addShiftZod } from '@/schema/shift';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
function UpdateShiftForm({
	shift,
}: {
	shift: ShiftType;
}) {
    const form = useForm<z.infer<typeof addShiftZod>>({
		resolver: zodResolver(addShiftZod),
	});

    async function onSubmit(values: z.infer<typeof addShiftZod>) {
		console.log(values);
	}
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.1 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: "backInOut" }}
    className="w-full p-2 mb-8">
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="shiftDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Shift Date</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} defaultValue={new Date(shift.shiftDate).toISOString().substring(0,10)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} defaultValue={shift.startTime}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} defaultValue={shift.endTime}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="w-full flex justify-end">
                <Button type="submit">Edit Shift</Button>
            </div>
        </form>
    </Form>


    <div className="w-full flex justify-end"></div>
</motion.div>
  )
}

export default UpdateShiftForm