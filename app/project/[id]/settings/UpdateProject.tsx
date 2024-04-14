"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  updateTitleFormSchema,
  updateDescriptionFormSchema,
  updateEndDateFormSchema,
  updateStartDateFormSchema,
} from "@/utils/types";
import {
  updateDescription,
  updateEndDate,
  updateStartDate,
  updateTitle,
} from "@/lib/actions";

export default function UpdateProject({ id, data }: { id: number; data: any }) {
  const titleForm = useForm<z.infer<typeof updateTitleFormSchema>>({
    resolver: zodResolver(updateTitleFormSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  async function onUpdateTitleSubmit(
    values: z.infer<typeof updateTitleFormSchema>,
  ) {
    await updateTitle(id, values);
  }

  const descriptionForm = useForm<z.infer<typeof updateDescriptionFormSchema>>({
    resolver: zodResolver(updateDescriptionFormSchema),
    defaultValues: {
      description: data?.project_details[0].description,
    },
  });

  async function onUpdateDescriptionSubmit(
    values: z.infer<typeof updateDescriptionFormSchema>,
  ) {
    await updateDescription(id, values);
  }

  const startDateForm = useForm<z.infer<typeof updateStartDateFormSchema>>({
    resolver: zodResolver(updateStartDateFormSchema),
    defaultValues: {
      startDate: new Date(data?.project_details[0].start_date),
    },
  });

  async function onUpdateStartDateSubmit(
    values: z.infer<typeof updateStartDateFormSchema>,
  ) {
    await updateStartDate(id, values);
  }

  const endDateForm = useForm<z.infer<typeof updateEndDateFormSchema>>({
    resolver: zodResolver(updateEndDateFormSchema),
    defaultValues: {
      endDate: new Date(data?.project_details[0].end_date),
    },
  });

  async function onUpdateEndDateSubmit(
    values: z.infer<typeof updateEndDateFormSchema>,
  ) {
    await updateEndDate(id, values);
  }

  return (
    <section className="flex flex-col space-y-8">
      <Card>
        <CardContent className=" pt-6">
          <Form {...titleForm}>
            <form
              onSubmit={titleForm.handleSubmit(onUpdateTitleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={titleForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={titleForm.formState.isSubmitting}>
                {titleForm.formState.isSubmitting ? (
                  <div className=" flex flex-row items-center justify-center gap-2">
                    <UpdateIcon className=" animate-spin" />
                    <span>Loading</span>
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className=" pt-6">
          <Form {...descriptionForm}>
            <form
              onSubmit={descriptionForm.handleSubmit(onUpdateDescriptionSubmit)}
              className="space-y-8"
            >
              <FormField
                control={descriptionForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Project Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={descriptionForm.formState.isSubmitting}
              >
                {descriptionForm.formState.isSubmitting ? (
                  <div className=" flex flex-row items-center justify-center gap-2">
                    <UpdateIcon className=" animate-spin" />
                    <span>Loading</span>
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-4">
        <Card>
          <CardContent className=" pt-6">
            <Form {...startDateForm}>
              <form
                onSubmit={startDateForm.handleSubmit(onUpdateStartDateSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={startDateForm.control}
                  name={"startDate"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " flex w-[240px] pl-3",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                field.value.toDateString()
                              ) : (
                                <span>Pick start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={startDateForm.formState.isSubmitting}
                >
                  {startDateForm.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className=" pt-6">
            <Form {...endDateForm}>
              <form
                onSubmit={endDateForm.handleSubmit(onUpdateEndDateSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={endDateForm.control}
                  name={"endDate"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " flex w-[240px] pl-3",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                field.value.toDateString()
                              ) : (
                                <span>Pick end date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={endDateForm.formState.isSubmitting}
                >
                  {endDateForm.formState.isSubmitting ? (
                    <div className=" flex flex-row items-center justify-center gap-2">
                      <UpdateIcon className=" animate-spin" />
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}