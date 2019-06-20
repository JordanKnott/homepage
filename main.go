package main

import (
	"bytes"
	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/gorilla/mux"
	"github.com/spf13/cobra"
	"html/template"
	"io/ioutil"
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

func generate() {
	var config ConfigData
	var renderedTmpl bytes.Buffer
	if _, err := toml.DecodeFile("config.toml", &config); err != nil {
		panic(err)
	}
	tmpl := template.Must(template.ParseFiles("tmpl/welcome.html"))

	tmpl.Execute(&renderedTmpl, TemplateData{config})

	err := ioutil.WriteFile("index.html", renderedTmpl.Bytes(), 0644)
	if err != nil {
		panic(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	var config ConfigData
	if _, err := toml.DecodeFile("config.toml", &config); err != nil {
		panic(err)
	}
	tmpl := template.Must(template.ParseFiles("tmpl/welcome.html"))

	tmpl.Execute(w, TemplateData{config})
}

func Serve() {
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

var rootCmd = &cobra.Command{
	Use:   "homepage",
	Short: "generate a index.html using a template and config file",
	Long:  "generate a index.html using a template and config file",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("generating index.html")
		generate()
	},
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "run a web server that render's a template using a config file",
	Long:  "run a web server that render's a template using a config file",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("serving web server on 127.0.0.1:9090")
		Serve()
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}

func main() {
	rootCmd.Execute()
}
