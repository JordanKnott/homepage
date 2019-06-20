package main

import (
	"github.com/BurntSushi/toml"
	"github.com/gorilla/mux"
	"html/template"
	"log"
	"net/http"
)

type IconLink struct {
	URL  string
	Icon string
}

type NormalLink struct {
	URL   string
	Label string
}

type ConfigData struct {
	IconLinks []IconLink `toml:"icon-links"`
	Columns   map[string][]NormalLink
}

type TemplateData struct {
	Config ConfigData
}

func handler(w http.ResponseWriter, r *http.Request) {
	var config ConfigData
	if _, err := toml.DecodeFile("config.toml", &config); err != nil {
		panic(err)
	}
	tmpl := template.Must(template.ParseFiles("tmpl/welcome.html"))

	tmpl.Execute(w, TemplateData{config})
}

func main() {

	r := mux.NewRouter()

	// This will serve files under http://localhost:8000/static/<filename>
	dir := "static"
	r.HandleFunc("/", handler)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(dir))))

	srv := &http.Server{
		Handler: r,
		Addr:    "127.0.0.1:9090",
	}

	log.Fatal(srv.ListenAndServe())
}
