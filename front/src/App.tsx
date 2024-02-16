import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Toaster } from "./components/ui/sonner";

export const App = () => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleDownload = async () => {
    console.log("test");
    try {
      console.log("test");
      const response = await axios.post("http://localhost:5200/download", {
        videoUrl: encodeURIComponent(videoUrl),
      });

      if (response.status === 200) {
        toast.success("O vídeo está sendo baixado. Verifique o seu download em breve!");
      } else {
        toast.error("Ocorreu um erro ao iniciar o download. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      toast.error("Ocorreu um erro na solicitação. Por favor, tente novamente.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 m-auto mt-20 bg-lime-300">
      <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={handleDownload}>
        <Input id="video" type="text" placeholder="Link do vídeo" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <Button variant="outline" type="submit">
          Baixar vídeo
        </Button>
      </form>

      <div>
        <Toaster />
      </div>
    </div>
  );
};
