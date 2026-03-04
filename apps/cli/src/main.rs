use clap::Parser;

#[derive(Parser)]
#[command(name = "apiark", version, about = "ApiArk CLI — run API collections from the command line")]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(clap::Subcommand)]
enum Commands {
    /// Run a collection or folder
    Run {
        /// Path to the collection
        collection: String,
        /// Environment name
        #[arg(short, long)]
        env: Option<String>,
    },
    /// Import a collection from another format
    Import {
        /// Path to the file to import
        file: String,
        /// Source format (postman, insomnia, openapi)
        #[arg(short, long)]
        format: Option<String>,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Some(Commands::Run { collection, env }) => {
            println!("Running collection: {collection}");
            if let Some(env) = env {
                println!("  with environment: {env}");
            }
            println!("(Not yet implemented)");
        }
        Some(Commands::Import { file, format }) => {
            println!("Importing: {file}");
            if let Some(fmt) = format {
                println!("  format: {fmt}");
            }
            println!("(Not yet implemented)");
        }
        None => {
            println!("ApiArk CLI — use --help for usage");
        }
    }
}
