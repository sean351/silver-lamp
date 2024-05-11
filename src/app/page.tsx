"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('XXXXXXXXXXXXXXXXXXXXX');

export default function Home() {
  const [data, setData] = useState(null);
  const [inputData, setInputData] = useState(0);

  useEffect(() => {
    socket.on('connect', function () {
      socket.emit('my event', { data: "I'm connected!" });
    });
    socket.on('vibestat', function (res) {
      vibelevel.innerText = res.level;
    });
    socket.on('reload', function (res) {
      document.location = document.location;
    });
  });

  const handleClick = (eventName: string, dataToEmit: number) => {
    socket.emit(eventName, dataToEmit);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };


  return (
    <Tabs defaultValue="qrcode" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        <TabsTrigger value="admin">Admin Panel</TabsTrigger>
      </TabsList>
      <TabsContent value="qrcode">
        <Card>
          <CardHeader>
            <CardTitle>Lovense QR Code</CardTitle>
            <CardDescription>
              Scan the QR Code below to connect!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <br />
              <img src="%s" />
              <br />            
              </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="admin">
        <Card>
          <CardHeader>
            <CardTitle>Lovense Admin Panel</CardTitle>
            <CardDescription>
              Override chat here!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between px-2 py-2">
              <Button onClick={() => handleClick('control', 0)}>Stop Vibe</Button>
              <Button onClick={() => handleClick('control', 1)}>Resume Vibe</Button>
              <Button onClick={() => handleClick('reload', 1)}>Reload</Button>
            </div>
            <div className="space-y-1">
              <Label htmlFor="override">Override Chat</Label>
              <Input id="override" type="text" value={inputData} onChange={() => handleInputChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleClick('chat', inputData)}>Override</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
