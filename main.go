package main

import (
	"fmt"
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

var config ConfigData

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("rendering template")
	tmpl := template.Must(template.ParseFiles("tmpl/welcome.html"))

	tmpl.Execute(w, TemplateData{config})
}

func main() {
	if _, err := toml.DecodeFile("config.toml", &config); err != nil {
		panic(err)
	}
	fmt.Println(config)

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
