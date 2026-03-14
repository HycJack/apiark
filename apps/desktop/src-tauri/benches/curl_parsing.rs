use criterion::{black_box, criterion_group, criterion_main, Criterion};

use apiark_lib::http::curl::parse_curl;

fn bench_curl_parsing(c: &mut Criterion) {
    let mut group = c.benchmark_group("curl_parsing");

    group.bench_function("simple_get", |b| {
        b.iter(|| parse_curl(black_box("curl https://api.example.com/users")).unwrap())
    });

    group.bench_function("post_with_json", |b| {
        b.iter(|| {
            parse_curl(black_box(
                r#"curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{"name": "test", "email": "test@example.com"}'"#,
            ))
            .unwrap()
        })
    });

    group.bench_function("complex_with_auth_headers", |b| {
        b.iter(|| {
            parse_curl(black_box(
                r#"curl -X PUT 'https://api.example.com/v2/users/123' \
                -H 'Content-Type: application/json' \
                -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.abc' \
                -H 'Accept: application/json' \
                -H 'X-Request-ID: 550e8400-e29b-41d4-a716-446655440000' \
                -H 'X-Api-Version: 2.0' \
                -H 'Cache-Control: no-cache' \
                -d '{"name": "John Doe", "email": "john@example.com", "role": "admin", "permissions": ["read", "write"]}' \
                -u admin:secret123 \
                -k -L --compressed"#,
            ))
            .unwrap()
        })
    });

    group.bench_function("many_headers_10", |b| {
        let headers: String = (0..10)
            .map(|i| format!("-H 'X-Header-{i}: value-{i}'"))
            .collect::<Vec<_>>()
            .join(" ");
        let curl = format!("curl https://api.example.com/data {headers}");
        b.iter(|| parse_curl(black_box(&curl)).unwrap())
    });

    group.finish();
}

criterion_group!(benches, bench_curl_parsing);
criterion_main!(benches);
